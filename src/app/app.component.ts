import { Component } from "@angular/core";
import { TypeaheadDropdownComponent } from "./typeahead-dropdown-component/typeahead-dropdown-component";
import { DataService } from "./services/data-service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TypeaheadDropdownComponent],
  providers: [DataService],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "Simple Typeahead Dropdown";
  itemsFn = new DataService().search;
}
