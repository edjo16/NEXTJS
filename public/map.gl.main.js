// Main Kepler.gl map logic and rendering
(function() {
  // Validate Mapbox Token
  if ((window.MAPBOX_TOKEN || '') === '' || window.MAPBOX_TOKEN === 'PROVIDE_MAPBOX_TOKEN') {
    alert(window.WARNING_MESSAGE);
  }

  // Redux/Kepler store setup
  const reducers = (function createReducers(redux, keplerGl) {
    return redux.combineReducers({
      keplerGl: keplerGl.keplerGlReducer.initialState({
        uiState: {
          readOnly: true,
          currentModal: null
        }
      })
    });
  }(Redux, KeplerGl));

  const middleWares = (function createMiddlewares(keplerGl) {
    return keplerGl.enhanceReduxMiddleware([
      // Add other middlewares here
    ]);
  }(KeplerGl));

  const enhancers = (function craeteEnhancers(redux, middles) {
    return redux.applyMiddleware(...middles);
  }(Redux, middleWares));

  const store = (function createStore(redux, enhancers) {
    const initialState = {};
    return redux.createStore(
      reducers,
      initialState,
      redux.compose(enhancers)
    );
  }(Redux, enhancers));
  window.store = store;
  window.KeplerGl = KeplerGl;

  // Kepler React component
  var KeplerElement = (function makeKeplerElement(react, keplerGl, mapboxToken) {
    return function App() {
      var rootElm = react.useRef(null);
      var _useState = react.useState({
        width: window.innerWidth,
        height: window.innerHeight
      });
      var windowDimension = _useState[0];
      var setDimension = _useState[1];
      react.useEffect(function sideEffect() {
        function handleResize() {
          setDimension({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return function () { window.removeEventListener('resize', handleResize); };
      }, []);
      return react.createElement(
        'div',
        { style: { position: 'absolute', left: 0, width: '100vw', height: '100vh' } },
        react.createElement(keplerGl.KeplerGl, {
          mapboxApiAccessToken: mapboxToken,
          id: "map",
          width: windowDimension.width,
          height: windowDimension.height
        })
      )
    }
  }(React, KeplerGl, window.MAPBOX_TOKEN));

  const app = (function createReactReduxProvider(react, reactRedux, KeplerElement) {
    return react.createElement(
      reactRedux.Provider,
      { store },
      react.createElement(KeplerElement, null)
    )
  }(React, ReactRedux, KeplerElement));

  // Render
  (function render(react, reactDOM, app) {
    const container = document.getElementById('app');
    const root = reactDOM.createRoot(container);
    root.render(app);
    // Hide loader when Kepler map is actually rendered
    function tryHideLoader() {
      var mapCanvas = document.querySelector('#app canvas');
      var loader = document.getElementById('loader');
      if (mapCanvas && loader) {
        loader.style.display = 'none';
      } else {
        setTimeout(tryHideLoader, 200);
      }
    }
    tryHideLoader();
  }(React, ReactDOM, app));
})();
