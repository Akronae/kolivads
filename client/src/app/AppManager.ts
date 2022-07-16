export class AppManager {
  public static showShadow = false;
  public static setShowShadow: React.Dispatch<React.SetStateAction<boolean>>;
  private static showShadowOnClickOnceListeners: Function[] = [];

  public static showShadowOnClick() {
    AppManager.showShadowOnClickOnceListeners.forEach(l => l());
    AppManager.showShadowOnClickOnceListeners.length = 0;
  }

  public static showShadowOnClickOnce(callback: Function) {
    AppManager.showShadowOnClickOnceListeners.push(callback);
  }
}
