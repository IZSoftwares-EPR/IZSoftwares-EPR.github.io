import React from "react";
import NavBar from "../components/NavBar";
import AlignedCenterLayout from "../layout/AlignedCenterLayout";
import { fetchEmployees, fetchQuestions, postReview } from "../utils/requests";
export default class QuestionsPage extends React.Component {
    state = { questions: [], employees: [], currentReviewedEmp: null }
    componentDidMount() {
        fetchEmployees().then(employees => {
            this.setState({ employees });
            this.setState({ currentReviewedEmp: employees[0] });
        })
        fetchQuestions().then(questions => {
            this.setState({ questions: questions.map(question => ({ ...question, value: "" })) });
        })
    }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <AlignedCenterLayout>
                    <div className="px-lg-5">
                        {this.state.currentReviewedEmp
                            ? (<React.Fragment>
                                <h1 className="text-center mb-4">Review for {this.state.currentReviewedEmp.name} ({this.state.employees.length} left)</h1>
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    {this.state.questions.map(({ id, text, value }, i) => (
                                        <div key={id} className="form-check mb-5">
                                            <label className="form-check-label mb-1" htmlFor={`question-item-select-${id}`}>
                                                {text}<span className="text-danger"> *</span>
                                            </label>
                                            <select className="form-select mt-2" id={`question-item-select-${id}`} required value={value} onChange={this.handleChange.bind(this, i)}>
                                                <option disabled value="">Select Score</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>
                                            </select>
                                        </div>
                                    ))}
                                    <div className="d-grid gap-2 mt-5 col-sm-12 col-md-8 col-xl-4 mx-auto">
                                        <button className="btn btn-primary" type="submit">Submit</button>
                                        <button onClick={this.handleSkip.bind(this)} className="btn btn-secondary" type="button">Skip</button>
                                    </div>
                                </form>
                            </React.Fragment>)
                            : <h1>Thanks for reviewing. Come back to check next week.</h1>
                        }
                    </div>
                </AlignedCenterLayout>
            </React.Fragment>
        )
    }
    handleChange(i, e) {
        let questions = this.state.questions;
        questions[i].value = e.target.value;
        this.setState({ questions: [...questions] });
    }
    handleSubmit(e) {
        e.preventDefault();
        postReview(this.state.currentReviewedEmp.id, this.getReviewData()).then(() => {
            const employees = this.state.employees;
            employees.shift();
            this.setState({ employees: [...employees] });
            this.resetForm();
        })
    }
    handleSkip() {
        const reviewData = this.getReviewData().map(piece => ({ ...piece, point: null }));
        postReview(this.state.currentReviewedEmp.id, reviewData).then(() => {
            const employees = this.state.employees;
            employees.shift();
            this.setState({ employees: [...employees] });
            this.resetForm();
        })
    }
    resetForm() {
        window.scrollTo({ top: 0 });
        this.setState({ currentReviewedEmp: this.state.employees[0] });
        this.setState({ questions: this.state.questions.map(question => ({ ...question, value: "" })) })
    }
    getReviewData() {
        return this.state.questions.map(question => ({ pq_id: question.id, point: question.value }))
    }
}
