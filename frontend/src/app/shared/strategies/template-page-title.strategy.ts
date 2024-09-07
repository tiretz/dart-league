import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { TitleService } from '../../core/services/title.service';

@Injectable({
  providedIn: 'root',
})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title, private readonly titleService: TitleService) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title: string | undefined = this.buildTitle(snapshot);

    const fullTitle: string = `Dart Liga${title ? ` - ${title}` : ''}`;

    this.title.setTitle(fullTitle);

    this.titleService.updateTitle(fullTitle);
  }
}
