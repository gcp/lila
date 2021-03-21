import attributes from 'snabbdom/modules/attributes';
import klass from 'snabbdom/modules/class';
import menuHover from 'common/menuHover';
import RacerCtrl from './ctrl';
import { Chessground } from 'chessground';
import { init } from 'snabbdom';
import { RacerOpts } from './interfaces';
import { VNode } from 'snabbdom/vnode';

const patch = init([klass, attributes]);

import view from './view/main';

export function start(opts: RacerOpts) {
  const element = document.querySelector('.racer-app') as HTMLElement;

  let vnode: VNode;

  function redraw() {
    vnode = patch(vnode, view(ctrl));
  }

  const ctrl = new RacerCtrl(opts, redraw);

  const blueprint = view(ctrl);
  element.innerHTML = '';
  vnode = patch(element, blueprint);

  menuHover();
  $('script').remove();
}

// that's for the rest of lichess to access chessground
// without having to include it a second time
window.Chessground = Chessground;
