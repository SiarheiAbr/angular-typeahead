import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { switchMap } from 'rxjs/operators';
import { DataSourceService } from "src/app/services/data-service";

@Component({
    selector: 'typeahead-dropdown-options',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './typeahead-dropdown-options.component.html',
    styleUrls: ['./typeahead-dropdown-options.component.scss']
  })
  export class TypeaheadDropdownOptionsComponent implements OnInit {
    @Input() searchTerm$!: Observable<string | null>;
    @Input() itemsFn!: DataSourceService;

    items$: Observable<string[]> | undefined;

    @Output() itemSelected = new EventEmitter<string>();

    ngOnInit() {
        this.items$ = this.searchTerm$
        .pipe(
            switchMap(search => this.itemsFn.search(search))        
        );
    }

    onOptionSelected(option: string) {
        this.itemSelected.emit(option);
      }    
  }