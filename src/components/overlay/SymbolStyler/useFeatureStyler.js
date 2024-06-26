import {} from "vue";
import { BehaviorSubject } from "rxjs";
import { from } from "@vueuse/rxjs";

const useFeatureStyler = () => {
  const $channel = new BehaviorSubject(null);


  from().subscribe((value) => {
    $channel.next(value);
  });

  return {};
};

export { useFeatureStyler };
