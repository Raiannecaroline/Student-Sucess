import { UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export interface CanDeactivate {
  
  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree

}