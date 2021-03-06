import React, {Component} from "react";
import Leaderboard from "./Leaderboard";
import TimerIcon from "../../assets/images/timer-w.svg";
import * as axios from "axios";
import Timer from "../layout/Timer";
import {apiBaseUrl} from "../../constants";
import {getImage} from "../Helper";
import "./contest.scss";
class Contest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "l",
            contest: {
                name: "Bershka",
                address: "Yoga Trapeze - SAMPLING",
                value: 10000,
                expirationTime: -1
            },
            image: ""
        };
        this.AuthStr = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = this.AuthStr;
    }

    componentDidMount() {
        axios({
            url: apiBaseUrl + "/contest/" + this.props.match.params.id,
        })
            .then(response => {
                this.setState({contest: response.data});
                getImage(response.data.imageId).then(
                    data => {
                        this.setState({
                            image: "data:image/jpeg;base64," + data
                        });
                    }
                );
            })
            .catch((response) => {
                console.log("error", response);
            });

    }

    render() {
        return (
            <div className="constestPage">
                <div className="header">
                    <div><h1>{this.state.contest.name}</h1><h2>{this.state.contest.address}</h2></div>
                    <div><span>Campaign value:</span><span className="contestValue">{this.state.contest.value}$</span>
                    </div>
                    <div className="contestTime"><TimerIcon/>&nbsp;&nbsp;{this.state.contest.expirationTime &&
                    <Timer expirationTime={this.state.contest.expirationTime}/>}</div>
                </div>
                <div className="contest">
                    {/*Contest <h3>ID: {this.props.match.params.id}</h3>*/}
                    <div className="switcher">
                        <button className={this.state.page === "l" ? "active leaderboardButton" : "leaderboardButton"}
                            onClick={() => this.setState({page: "l"})}>Leaderboard
                        </button>
                        <button className={this.state.page === "b" ? "active briefButton" : "briefButton"}
                            onClick={() => this.setState({page: "b"})}>Brief
                        </button>
                    </div>
                    <div className="contestContent">
                        {this.state.page === "l" && <div className="leaderBoard">
                            <Leaderboard/>

                        </div>}
                        {this.state.page === "b" &&
                        <div className="brief">
                            <div>
                                <h3>{this.state.contest.name}</h3>
                                {this.state.contest.description}
                            </div>
                            <div>
                                <h3>Content text</h3>
                                We'd love your posts to generate enthusiasm about buying the product. This could be
                                images of our coffee being made in a cup, mug or jar. We'd love your posts to be
                                coffee-inspired, showcasing our brand alongside your daily routine. In your caption,
                                talk about our product and tell the best coffee offer to your followers!
                            </div>
                            {this.state.contest.imageId &&
                            <img src={this.state.image}/>}
                        </div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Contest;
