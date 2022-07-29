import {
  DefaultProps,
  ReactiveState,
  useStateIfDefined,
} from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Div } from './Div';
import { ZIndex } from '@/styles/theme';
import { CrossIcon } from '@/app/components/assets';
import { ReactNode, useEffect } from 'react';

export interface Props extends DefaultProps {
  topActions?: ReactNode;
  hoverContent?: ReactNode;
  previewContent?: ReactNode;
  modalContent?: ReactNode;
  toggleModel?: ReactiveState<boolean>;
  expandInPlace?: boolean;
}

/**
 * An ExpandableModal is a regular component that appears on the page in a normal fashion,
 * but when clicked turns into a modal.
 */
export function ExpandableModal(p: Props) {
  let {
    previewContent,
    hoverContent,
    modalContent,
    topActions,
    toggleModel,
    expandInPlace,
    ...passedProps
  } = p;

  passedProps.className += ' ExpandableModal';

  const editModalToggled = useStateIfDefined(toggleModel, false);

  const showModal = () => {
    editModalToggled.state = true;
  };
  const hideModal = () => {
    editModalToggled.state = false;
  };

  var onElemClick: (() => void) | undefined = showModal;

  useEffect(() => {
    if (expandInPlace) {
      editModalToggled.state = true;
      passedProps.className += ' expand-in-place';
    }
  }, [editModalToggled, expandInPlace, passedProps]);

  if (editModalToggled.state) {
    passedProps.className += ' edit-modal-toggled';
    onElemClick = undefined;
  }

  return (
    <>
      <ModalShadow
        showIf={editModalToggled.state && !expandInPlace}
        onClick={hideModal}
      />
      <ExpandableModalWrapper {...passedProps} onClick={onElemClick}>
        <div className="content">
          <div className="preview">
            <Div className="actions">
              {topActions}
              <Div
                showIf={editModalToggled.state && !expandInPlace}
                className="close-btn"
                onClick={hideModal}
                tooltip="close"
              >
                <CrossIcon />
              </Div>
            </Div>
            {previewContent}
          </div>
          <Div showIf={editModalToggled.state}>{modalContent}</Div>
        </div>
        <Div className="click-action-label" showIf={!editModalToggled.state}>
          <div className="hover-content">{hoverContent}</div>
        </Div>
      </ExpandableModalWrapper>
    </>
  );
}

const ExpandableModalWrapper = styled(Div)`
  background-color: ${p => p.theme.contentBackgroundColor};
  border-radius: 10px;
  box-shadow: ${p => p.theme.boxShadowSharp};
  position: relative;
  padding: 1em;

  &.clickable {
    &:hover {
      .click-action-label {
        display: block;
      }
    }
  }

  &.edit-modal-toggled {
    overflow-y: overlay;

    &:not(.expand-in-place) {
      position: fixed;
      z-index: ${ZIndex.Modal};
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      min-width: 20em;
      max-width: 45em;
      min-height: 10em;
      max-height: 80vh;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${p => p.theme.backgroundTextColor};
      border: 6px solid transparent;

      border-radius: 8px;
      background-clip: padding-box;
    }

    ::-webkit-scrollbar {
      width: 16px;
    }

    .content .text {
      padding: 30px;
      padding-bottom: 15px;
    }
  }

  .click-action-label {
    display: none;
    position: absolute;
    top: 0;
    font-size: 1.5em;
    font-weight: bold;
    color: white;
    text-shadow: ${p => p.theme.textShadow};
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);
    z-index: ${ZIndex.Regular};
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: inherit;
    backdrop-filter: blur(1px);

    .hover-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      .Separator {
        background-color: rgba(255, 255, 255, 0.4);
        width: 50%;
        height: 1px;
      }

      svg {
        width: 1.5em;
        height: 1.5em;
        margin-bottom: 0.5em;
      }
    }
  }

  .content {
    border-radius: inherit;

    .preview {
      border-radius: inherit;

      img {
        width: 100%;
        height: 16em;
        object-fit: cover;
        border-radius: inherit;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      .actions {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        flex-direction: row;

        svg {
          width: 30px;
          height: 30px;
          fill: white;
          filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 1));
          cursor: pointer;
          margin: 0 0.2em;
        }
      }
    }
  }
`;

const ModalShadow = styled(Div)`
  position: fixed;
  z-index: ${ZIndex.ModalShadow};
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
