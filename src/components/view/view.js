import $ from 'dom7';
import Utils from '../../utils/utils';
import View from './view-class';

function getCurrentView(app) {
  const popoverView = $('.popover.modal-in .view');
  const popupView = $('.popup.modal-in .view');
  const panelView = $('.panel.panel-active .view');
  let appViews = $('.views');
  if (appViews.length === 0) appViews = app.root;
  // Find active view as tab
  let appView = appViews.children('.view');
  // Propably in tabs or split view
  if (appView.length > 1) {
    if (appView.hasClass('tab')) {
      // Tabs
      appView = appViews.children('.view.tab-active');
    } else {
      // Split View, leave appView intact
    }
  }
  if (popoverView.length > 0 && popoverView[0].f7View) return popoverView[0].f7View;
  if (popupView.length > 0 && popupView[0].f7View) return popupView[0].f7View;
  if (panelView.length > 0 && panelView[0].f7View) return panelView[0].f7View;
  if (appView.length > 0) {
    if (appView.length === 1 && appView[0].f7View) return appView[0].f7View;
    if (appView.length > 1) {
      return app.views.main;
    }
  }
  return undefined;
}

export default {
  name: 'view',
  params: {
    view: {
      stackPages: false,
      xhrCache: true,
      xhrCacheIgnore: [],
      xhrCacheIgnoreGetParameters: false,
      xhrCacheDuration: 1000 * 60 * 10, // Ten minutes
      preloadPreviousPage: true,
      uniqueHistory: false,
      uniqueHistoryIgnoreGetParameters: false,
      allowDuplicateUrls: false,
      reloadPages: false,
      removeElements: true,
      removeElementsWithTimeout: false,
      removeElementsTimeout: 0,
      // Swipe Back
      swipeBackPage: true,
      swipeBackPageAnimateShadow: true,
      swipeBackPageAnimateOpacity: true,
      swipeBackPageActiveArea: 30,
      swipeBackPageThreshold: 0,
      // Push State
      pushState: false,
      pushStateRoot: undefined,
      pushStateAnimate: true,
      pushStateAnimateOnLoad: false,
      pushStateSeparator: '#!',
      pushStateOnLoad: true,
      // Animate Pages
      animate: true,
      animateWithJS: true,
      // iOS Dynamic Navbar
      iosDynamicNavbar: true,
      iosSeparateDynamicNavbar: true,
      // Animate iOS Navbar Back Icon
      iosAnimateNavbarBackIcon: true,
      // MD Theme delay
      materialPageLoadDelay: 0,
    },
  },
  static: {
    View,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      views: Utils.extend([], {
        create(el, params) {
          return new View(app, el, params);
        },
      }),
    });
    Object.defineProperty(app.views, 'current', {
      enumerable: true,
      configurable: true,
      get() {
        return getCurrentView(app);
      },
    });
  },
};
