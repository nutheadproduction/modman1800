import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModManagerService } from "../mod-manager.service";
import { AnnoMOD } from "../AnnoMOD";
import { Sort } from "@angular/material/sort";

@Component({
  selector: 'app-mod-list',
  templateUrl: './mod-list.component.html',
  styleUrls: ['./mod-list.component.sass'],
  host: {
    "[class.slim]": "slim"
  }
})
export class ModListComponent implements OnInit, OnChanges {

  constructor(public modService: ModManagerService) {
  }

  @Input() searchTerm: string = '';
  @Input() cardView: boolean = true;

  selected?: AnnoMOD;


  @Input() slim = true;
  @Input() enabledFilter: boolean | null = false;
  @Input() dlcFilter: boolean | null = false;

  displayedColumns = ["enabled", "title", "info", "actions"];


  ngOnInit(): void {
  }

  ngOnChanges() {
  }

  sortedMods(): AnnoMOD[] {
    let mods = [...this.modService.mods.values()].sort((a, b) => {return a.folder_name > b.folder_name ? 1 : -1});
    // let ret: AnnoMOD[] = [];
    if (this.enabledFilter !== null) {
      mods = mods.filter(mod => mod.enabled === this.enabledFilter);
    }
    if (this.dlcFilter !== null) {
      mods = mods.filter(mod => mod.usable == this.dlcFilter);
    }
    if (!this.searchTerm) return mods;

    let scoreSum = 0;


    let scores = mods
      .map((mod) => {
        const score = mod.searchScore(this.searchTerm);
        scoreSum += scoreSum;
        return { score: score, mod: mod }
      });

    mods = scores
      .filter(value => {return value.score > 0})
      .sort((a, b) => b.score - a.score)
      .map(value => value.mod)
    ;


    return mods;


    // return mods.filter((mod) => {
    //   // mod.name.indexOf()
    // });
  }

  sortData($event: Sort) {

  }
}
