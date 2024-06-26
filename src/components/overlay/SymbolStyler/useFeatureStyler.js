import {} from "vue";
import { storeToRefs } from "pinia";
import { BehaviorSubject } from "rxjs";
import { from } from "@vueuse/rxjs";
import { useSymbol } from "@/models/symbol.js";

const useFeatureStyler = (ctx) => {
  const $channel = new BehaviorSubject(null);

  const symbolStore = useSymbol();
  const { sketchSymbolPaint } = storeToRefs(symbolStore);

  from(sketchSymbolPaint).subscribe((value) => {
    $channel.next(value);
  });

  return { $channel };
};

export { useFeatureStyler };
