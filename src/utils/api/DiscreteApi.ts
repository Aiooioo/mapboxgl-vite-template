import {
  createDiscreteApi,
  lightTheme,
  LoadingBarProviderProps,
  NotificationProviderProps,
  MessageProviderProps,
  DialogProviderProps,
} from "naive-ui";
import { config } from "./initConfig";
import { ref } from "vue";
const configProviderProps = ref({
  theme: lightTheme,
});

const configMsg: MessageProviderProps & { level?: unknown } = {
  ...config.message,
};
delete configMsg.level;
const { notification, message, dialog, loadingBar } = createDiscreteApi(
  ["notification", "message", "dialog", "loadingBar"],
  {
    configProviderProps,
    notificationProviderProps: {},
    messageProviderProps: {
      ...configMsg,
    },
    loadingBarProviderProps: {},
    dialogProviderProps: {},
  },
);
export function useSpinBar(props?: LoadingBarProviderProps) {
  return props
    ? createDiscreteApi(["loadingBar"], {
        configProviderProps,
        loadingBarProviderProps: {
          ...props,
          containerStyle: "position: absolute;",
        },
      }).loadingBar
    : loadingBar;
}

export function useNotification(props?: NotificationProviderProps) {
  return props
    ? createDiscreteApi(["notification"], {
        configProviderProps,
        notificationProviderProps: props,
      }).notification
    : notification;
}

export function useMessage(props?: MessageProviderProps) {
  return props
    ? createDiscreteApi(["message"], {
        configProviderProps,
        messageProviderProps: { ...configMsg, ...props },
      }).message
    : message;
}

export function useDialog(props?: DialogProviderProps) {
  return props
    ? createDiscreteApi(["dialog"], {
        configProviderProps,
        dialogProviderProps: props,
      }).dialog
    : dialog;
}
