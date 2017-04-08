/**
 * Created by Krzysiek on 2017-03-18.
 */
import React, {Component, PropTypes} from "react";
import Vector from "./Vector";
import _ from "underscore";
import classNames from "classnames";
import "./Board.css";

export default class Board extends Component {
    static propTypes =
        {
            size: PropTypes.instanceOf(Vector),
            snakePositions: PropTypes.arrayOf(PropTypes.instanceOf(Vector)),
            fruitPosition: PropTypes.instanceOf(Vector)
        };

    render() {
        const rows = _.range(this.props.size.y).map(y => {
            const map = _.range(this.props.size.x).map(x => {
                const pos = new Vector(x, y);
                const maybeSnakeStyle = {
                    "snake": this.props.snakePositions.find(s => s.equals(pos))
                };
                const maybeFruitStyle = {
                    "fruit": this.props.fruitPosition.equals(pos)
                };
                return <div className={classNames("cell", maybeSnakeStyle, maybeFruitStyle)}></div>
            });
            return <div className="row">{map}</div>;
        });

        return <div className="Board">{rows}</div>;

    }

}