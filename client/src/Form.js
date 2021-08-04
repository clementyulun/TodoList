import React, {Component} from 'react'

class Form extends Component{
    InitialState = {
        title: '',
        content: ''
    }

    state = this.InitialState

    handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.InitialState)
    }

    render(){
        const {title, content} = this.state

        return(
            <form>
                <label htmlFor="title">Todo : </label><br/>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                />
                <br/>
                <label htmlFor="content">Content : </label><br/>
                <input
                    type="text"
                    name="content"
                    value={content}
                    onChange={this.handleChange}
                />
                <br/>
                <input
                    type="button"
                    value="submit"
                    onClick={this.submitForm}
                />
            </form>
        )
    }
}

export default Form