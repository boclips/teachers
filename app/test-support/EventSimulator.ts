import { ReactWrapper } from 'enzyme';
import { KeyboardEvent } from 'react';

export default class EventSimulator {
  public click = this.interact(EventSimulator.doClick);
  public pressEsc = this.interact(this.doPressKey(27));
  public pressEnter = this.interact(this.doPressKey(13));
  public pressShiftEnter = this.interact(this.doPressKey(13, true));
  public setText = (text: string, element: ReactWrapper) =>
    this.interact(this.doSetText(text))(element);

  constructor(protected wrapper: ReactWrapper) {}

  private static doClick(element: ReactWrapper) {
    const clickHandler = element.prop('onClick') as () => null;
    if (clickHandler === null || clickHandler === undefined) {
      throw new Error(`Element has no click handler:\n${element.debug()} `);
    }
    if (typeof clickHandler !== 'function') {
      throw new Error(`onClick handler is not a function: ${clickHandler}`);
    }
    clickHandler();
  }

  private doPressKey(keyCode: number, shiftKey: boolean = false) {
    return (element: ReactWrapper) => {
      const event: Partial<KeyboardEvent<any>> = {
        keyCode,
        shiftKey,
      };

      element.simulate('keydown', event);
    };
  }

  private doSetText(value: string) {
    return (element: ReactWrapper) => {
      element.simulate('change', { target: { value } });
      element.simulate('blur');
    };
  }

  private interact(interaction: (element: ReactWrapper) => void) {
    return (element: ReactWrapper) => {
      if (element.length === 0) {
        throw new Error(`No elements match in:\n${this.wrapper.debug()}`);
      }

      if (element.length > 1) {
        throw new Error(`Multiple elements match in:\n${element.debug()}`);
      }

      interaction(element);

      return this.wrapper.update();
    };
  }
}
