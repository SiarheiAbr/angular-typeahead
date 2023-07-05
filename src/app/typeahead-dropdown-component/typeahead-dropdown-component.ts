import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  startWith,
} from "rxjs/operators";

import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { OnDestroy } from "@angular/core";
import { TypeaheadDropdownOptionsComponent } from "./typeahead-dropdown-options.component/typeahead-dropdown-options.component";

@Component({
  selector: "app-typeahead-dropdown",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TypeaheadDropdownOptionsComponent,
  ],
  templateUrl: "./typeahead-dropdown-component.html",
  styleUrls: ["./typeahead-dropdown-component.scss"],
})
export class TypeaheadDropdownComponent implements OnInit, OnDestroy {
  @Input() itemsFn!: (search: string | null) => Observable<string[]>;

  private onDestroy = new Subject();
  searchControl = new FormControl("");
  searchTerm$!: Observable<string | null>;
  showOptions: boolean = false;

  @ViewChild("searchInput") searchInput!: ElementRef;
  @ViewChild("options") options!: ElementRef;

  constructor(private renderer: Renderer2) {
    this.renderer.listen("window", "click", (e: Event) => {
      /**
       * Hide options by click outside of dropdown container.
       */
      if (
        e.target !== this.searchInput.nativeElement &&
        (this.options == null || e.target !== this.options.nativeElement)
      ) {
        this.showOptions = false;
      }
    });
  }

  ngOnInit() {
    this.searchTerm$ = this.searchControl.valueChanges.pipe(
      startWith(""),
      debounceTime(200),
      distinctUntilChanged(),
      takeUntil(this.onDestroy)
    );
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
