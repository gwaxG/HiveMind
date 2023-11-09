import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from "./components/history/history.component"
import { PredictionsComponent } from "./components/predictions/predictions.component"

const routes: Routes = [
  { path: '', component: PredictionsComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
