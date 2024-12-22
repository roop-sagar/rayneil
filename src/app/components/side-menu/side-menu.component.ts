import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TREEDATA } from '../../../shared/staticData';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  @Output() emitMatchId = new EventEmitter();
  treeData = TREEDATA;

  constructor(private router: Router) {}

  toggleNode(node: any) {
    node.target.classList.toggle('expanded');
  }

  getMatchData(id: number){
    this.emitMatchId.emit(id);
  }
}
