import { Transition } from 'vue';
import { createNamespace } from '../utils';
import Icon from '../icon';

const [createComponent, bem] = createNamespace('tag');

export default createComponent({
  props: {
    size: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    closeable: Boolean,
    type: {
      type: String,
      default: 'default',
    },
    show: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['close'],

  setup(props, { slots, emit }) {
    return function () {
      const { type, mark, plain, color, round, size } = props;

      const key = plain ? 'color' : 'backgroundColor';
      const style = { [key]: color };

      if (props.textColor) {
        style.color = props.textColor;
      }

      const classes = { mark, plain, round };
      if (size) {
        classes[size] = size;
      }

      const CloseIcon = props.closeable && (
        <Icon
          name="cross"
          class={bem('close')}
          onClick={(event) => {
            event.stopPropagation();
            emit('close');
          }}
        />
      );

      return (
        <Transition name={props.closeable ? 'van-fade' : null}>
          {props.show ? (
            <span key="content" style={style} class={bem([classes, type])}>
              {slots.default?.()}
              {CloseIcon}
            </span>
          ) : null}
        </Transition>
      );
    };
  },
});