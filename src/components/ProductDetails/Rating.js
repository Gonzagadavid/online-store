import React, { Component } from 'react';
import StarRatings from 'react-star-ratings'; // https://www.npmjs.com/package/react-star-ratings
import { string } from 'prop-types';
import './Rating.css';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      comments: '',
      evaluationList: [],
    };
    this.changeRating = this.changeRating.bind(this);
    this.handleChangeComments = this.handleChangeComments.bind(this);
    this.handleClickSend = this.handleClickSend.bind(this);
  }

  handleChangeComments(event) {
    this.setState({
      comments: event.target.value,
    });
  }

  handleClickSend() {
    const { id } = this.props;
    const { rating, comments } = this.state;
    this.setState((prevState) => ({
      evaluationList: [...prevState.evaluationList, { productId: id, rating, comments }],
    }));
    this.setState({
      rating: 3,
      comments: '',
    });
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating,
    });
  }

  renderComments() {
    const { comments } = this.state;
    return (
      <label
        data-testid="evaluation-label"
        htmlFor="product-detail-evaluation"
      >
        Comentários
        <textarea
          data-testid="product-detail-evaluation"
          type="text"
          id="product-detail-evaluation"
          value={ comments }
          onChange={ this.handleChangeComments }
        />
      </label>
    );
  }

  renderSendButton() {
    return (
      <button
        type="button"
        className="send-evaluation"
        onClick={ this.handleClickSend }
      >
        Enviar Avaliação
      </button>
    );
  }

  renderEvaluations() {
    const { evaluationList } = this.state;
    return (
      <div className="evaluation-list">
        {
          evaluationList.length
            ? evaluationList.map((evaluation) => (
              <div className="evaluation" key={ evaluation.productId }>
                <StarRatings
                  rating={ evaluation.rating }
                  starRatedColor="blue"
                  changeRating={ () => evaluation.rating }
                  numberOfStars={ 5 }
                  name="rating"
                />
                <p>{evaluation.comments}</p>
              </div>
            ))
            : <p>Nenhuma avaliação</p>
        }
      </div>
    );
  }

  render() {
    const { rating } = this.state;
    return (
      <div>
        <form className="rating-form">
          <StarRatings
            rating={ rating }
            starRatedColor="blue"
            changeRating={ this.changeRating }
            numberOfStars={ 5 }
            name="rating"
          />
          {this.renderComments()}
          {this.renderSendButton()}
        </form>
        { this.renderEvaluations() }
      </div>
    );
  }
}

Rating.propTypes = {
  id: string.isRequired,
};

export default Rating;
