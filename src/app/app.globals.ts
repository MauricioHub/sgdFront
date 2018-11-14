import { Injectable } from '@angular/core';
import { Profile } from "../app/interfaces/profile.interface";

@Injectable()
export class Globals {
  disableRoot:boolean = false;
  profileRoot:Profile[] = [];
  refreshSession:boolean = false;
}