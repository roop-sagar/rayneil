import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MatchDetailComponent } from './components/match-detail/match-detail.component';
import { MATCHDATA } from '../shared/staticData';
import { StoreTestComponent } from './store-test/store-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SideMenuComponent,MatchDetailComponent,StoreTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  matchId: number | undefined;
  matchDataSource: any[]=[];
  allMatchData = MATCHDATA;
  ngOnInit(): void {
  }

  hanldeEmitMatchId(matchId: number){
    this.matchId = matchId;
    if(this.matchId){
      this.matchDataSource = this.allMatchData.filter(match => match.id === this.matchId);
    }
  }
}
