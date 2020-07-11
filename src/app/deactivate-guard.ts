import { CanDeactivate } from '@angular/router';
import {Component} from '@angular/core';


export class DeactivateGuard implements CanDeactivate<Component> {

  canDeactivate(component) {
    return component.canDeactivate();
  }
}