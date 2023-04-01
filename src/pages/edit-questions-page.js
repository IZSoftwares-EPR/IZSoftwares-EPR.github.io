import React, { useState } from "react";
import AlignedCenterLayout from "../layout/AlignedCenterLayout";
import { createPerformaceQuestion, updatePerformaceQuestion, getPerformanceQuestions, deletePerformaceQuestion } from "../utils/requests";
import NavBar from "../components/NavBar";
let has_fetched_questions = false;

function TableData({ id, name: defName, points: defPoints, index, onSubmit }) {
    const [name, setName] = useState(defName);
    const [points, setPoints] = useState(defPoints);
    const [action, setAction] = useState(id === "" ? "create" : "delete");
    return (
        <tr>
            <th scope="row">
                {index + 1}
            </th>
            <td>
                <input required name="name" placeholder="Question Text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </td>
            <td>
                <input required name="points" placeholder="Question Points" className="form-control" type="number" value={points} onChange={(e) => setPoints(e.target.value)}></input>
            </td>
            <td>
                <select required className="form-select" value={action} onChange={(e) => setAction(e.target.value)}>
                    <option value="create" disabled={id !== ""}>Add</option>
                    <option value="delete">Delete</option>
                    <option value="edit" disabled={id === ""}>Edit</option>
                </select>
            </td>
            <td>
                <button onClick={() => onSubmit({ id, name, points, action, index })} className="btn w-100 btn-primary text-capitalize">
                    Apply
                </button>
            </td>
        </tr>
    )
};

export default class EditQuestionsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questions: [] };
    }
    componentDidMount() {
        if (!has_fetched_questions) {
            has_fetched_questions = true
            getPerformanceQuestions().then(questions => {
                this.setState({
                    questions
                })
            })
        }
    }
    render() {
        return (
            <>
                <NavBar/>
                <AlignedCenterLayout>
                    <div className="container">
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary mt-2 mb-4" onClick={this.pushNewQuestion.bind(this)}>New Question</button>
                        </div>
                        <table className="table table-striped  w-100">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        #
                                    </th>
                                    <th scope="col">
                                        Question Text
                                    </th>
                                    <th scope="col" style={{ width: "20%" }}>
                                        Question Points
                                    </th>
                                    <th scope="col">
                                        Action
                                    </th>
                                    <th scope="col">
                                        Apply
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.questions.map(({ id, name, point }, index) => (
                                        <TableData key={index} id={id} name={name} points={point} index={index} onSubmit={this.handleSubmit.bind(this)} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </AlignedCenterLayout>
            </>
        )
    }
    handleSubmit(data) {
        switch (data.action) {
            case "edit":
                updatePerformaceQuestion(data.id, data.name, data.points);
                break;
            case "create":
                createPerformaceQuestion(data.name, data.points).then((question) => {
                    let questions = [...this.state.questions];
                    questions[data.index] = question;
                    this.setState({ questions });
                });
                break;
            case "delete":
                if (data.id !== "") {
                    deletePerformaceQuestion(data.id);
                }
                let questions = [...this.state.questions];
                questions.splice(data.index, 1);
                this.setState({ questions })
                break;
            default:
                console.error("Unknowm action: " + data.action);
        }

    }
    pushNewQuestion() {
        this.setState(
            {
                questions: [
                    ...this.state.questions,
                    {
                        id: "",
                        name: "",
                        point: ""
                    },
                ]
            }
        )
    }
}