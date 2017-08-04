import * as React from 'react';
import { connect, Dispatch, ActionCreator } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../../reducers';
import { setRuntimeError, SetRuntimeErrorPayload } from '../../../actions';
import './error-boundary.css';

type OwnProps = {
  children?: React.ReactNode
};

type StateProps = {
  hasError: boolean
};

type DispatchProps = {
  setRuntimeError: ActionCreator<object>;
};

export type ErrorBoundaryProps = StateProps & DispatchProps & OwnProps & RouteComponentProps<null>;

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, {}> {
  props: ErrorBoundaryProps;

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.setRuntimeError({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  render() {
    if (this.props.hasError) {
      return (
        <div className="zv-error-boundary">
          <div className="cover">
            <h1>Oh no! The application has crashed</h1>
            <p className="lead">
              An unexpected error was encountered.<br />
              Our team has been dispatched to fix this issue.
            </p>
          </div>
        </div>
      );
    }

    return React.Children.only(this.props.children);
  }
}

const withStore = connect<StateProps, DispatchProps, OwnProps & RouteComponentProps<null>>(
  (state: RootState): StateProps => ({
    hasError: !!state.runtime.error
  }),
  (dispatch: Dispatch<RootState>): DispatchProps => ({
    setRuntimeError: (value: SetRuntimeErrorPayload) => dispatch(setRuntimeError(value))
  })
);

export const ErrorBoundaryWithStore = withRouter<OwnProps>(withStore(ErrorBoundary));
