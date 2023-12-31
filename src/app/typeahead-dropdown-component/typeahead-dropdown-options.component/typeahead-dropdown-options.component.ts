import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'typeahead-dropdown-options',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './typeahead-dropdown-options.component.html',
    styleUrls: ['./typeahead-dropdown-options.component.scss']
  })
  export class TypeaheadDropdownOptionsComponent implements OnInit {
    @Input() searchTerm$!: Observable<string | null>;
    @Input() itemsFn!: (search: string | null) => Observable<string[]>;

    items$: Observable<string[]> | undefined;

    @Output() itemSelected = new EventEmitter<string>();

    ngOnInit() {
        this.items$ = this.searchTerm$
        .pipe(
            switchMap(search => this.itemsFn(search))        
        );
    }

    onOptionSelected(option: string) {
        this.itemSelected.emit(option);
      }    
  }