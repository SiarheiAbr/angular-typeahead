import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, toArray, takeUntil, startWith } from 'rxjs/operators';

import { DataService, DataSourceService, TEntity } from '../services/data-service';
//import { AppModule } from './app.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { TypeaheadDropdownOptionsComponent } from './typeahead-dropdown-options.component/typeahead-dropdown-options.component';
//import { DefaultValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-typeahead-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TypeaheadDropdownOptionsComponent],
  templateUrl: './typeahead-dropdown-component.html',
  styleUrls: ['./typeahead-dropdown-component.scss']
})
export class TypeaheadDropdownComponent implements OnInit, OnDestroy {
    @Input() itemsFn!: DataSourceService;

    private onDestroy = new Subject();
    searchControl = new FormControl('');
    searchTerm$!: Observable<string | null>;
    //items$: Observable<string[]> | undefined;
    // items$: Observable<string[]> | undefined;
    showOptions: boolean = false;

    @ViewChild('searchInput') searchInput!: ElementRef;
    @ViewChild('options') options!: ElementRef;
    
    constructor(private renderer: Renderer2) {      
      this.renderer.listen('window', 'click',(e:Event)=>{
           /**
            * Hide options by click outside of dropdown container.
            */
          if(e.target !== this.searchInput.nativeElement && (this.options == null || e.target !== this.options.nativeElement)) {
              this.showOptions = false;
          }
      });
    }

    ngOnInit() {
          this.searchTerm$ = this.searchControl.valueChanges
          .pipe(
              //map(v => v),
              startWith(''),
              debounceTime(200),              
              distinctUntilChanged(),
              takeUntil(this.onDestroy),
          );

    //     const searchText$: Observable<string> = 
    //   fromEvent<any>(this.input.nativeElement, 'keyup')
    // .pipe(
    //     map(event => event.target.value),
    //     startWith(''),
    //     debounceTime(400),
    //     distinctUntilChanged()
    // ); 

      // this.items$ = this.searchTerm$
      //   .pipe(
      //       switchMap(search => this.itemsFn.search(search))        
      //   );
    }

    onInputMouseDown() {
      this.showOptions = true;

      // used to recalculate options list when input has already a value and we show the list again
      setTimeout(() => this.searchControl.setValue(this.searchControl.value), 0);
    }

    onOptionSelected(option: string) {
      this.searchControl.setValue(option);
      this.showOptions = false;
    }

    ngOnDestroy() {    
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}