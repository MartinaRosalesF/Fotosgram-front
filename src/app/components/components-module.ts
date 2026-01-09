import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes-module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';



@NgModule({
  declarations: [PostComponent, PostsComponent, AvatarSelectorComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports:[PostComponent, PostsComponent, AvatarSelectorComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
