import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import math from 'mathjs';
import {
  Paper,
  AppBar,
  Toolbar,
  Button,
  Typography,
  withStyles,
} from '@material-ui/core';
import Expression from './Expression';
import ActionsMenu from './ActionsMenu';
import { setExpressionTree } from '../actions/expressionActions';

const styles = {
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  expressionContainer: {
    textAlign: 'center',
    padding: 18,
    fontSize: 35,
  },
  appBar: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
};

export class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    const { expression, onExpressionChange, expressionTree } = this.props;
    if (expression !== prevProps.expression) {
      this.initialize();
    }
    onExpressionChange(expressionTree.toString({ parenthesis: 'auto' }));
  }

  initialize() {
    const { expression, setExpressionTreeOnState } = this.props;
    const expressionTree = math.parse(expression);
    setExpressionTreeOnState(expressionTree);
  }

  render() {
    const { expressionTree, classes, title } = this.props;
    return (
      <Paper className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
            >
              {title}
            </Typography>
            <Button
              color="inherit"
              onClick={this.initialize}
            >
              Reset
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.expressionContainer}>
          <Expression
            treeRoot={expressionTree}
            path="Root"
          />
        </div>
        <ActionsMenu />
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  expressionTree: state.expression.expressionTree,
});

const mapDispatchToProps = dispatch => ({
  setExpressionTreeOnState: expressionTree => dispatch(setExpressionTree(expressionTree)),
});

MainComponent.propTypes = {
  title: PropTypes.string,
  expression: PropTypes.string,
  onExpressionChange: PropTypes.func.isRequired,
  setExpressionTreeOnState: PropTypes.func.isRequired,
  expressionTree: PropTypes.shape({}),
  classes: PropTypes.shape({}).isRequired,
};

MainComponent.defaultProps = {
  title: '',
  expression: '',
  expressionTree: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MainComponent));
