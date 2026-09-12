import { Pipe, PipeTransform } from "@angular/core";
import { formatRepoName } from "../../utils/format-repo-name";

@Pipe({ name: 'formatRepoName' })
export class FormatRepoNamePipe implements PipeTransform {
  transform(value: string): string {
    return formatRepoName(value);
  }
}