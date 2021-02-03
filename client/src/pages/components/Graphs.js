import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { withAuth0 } from '@auth0/auth0-react'

class Graphs extends Component {

  id = this.props.id

  checkPost = (post) => {
    return post.id === this.state.id;
  }

  state={
    dates: this.props.posts.slice(0).reverse().filter(post => post.id === this.id).map(post => new Date(post.date).toLocaleDateString()),
    points: this.props.posts.slice(0).reverse().filter(post => post.id === this.id).map(post => post.points),
    assists: this.props.posts.slice(0).reverse().filter(post => post.id === this.id).map(post => post.assists),
    rebounds: this.props.posts.slice(0).reverse().filter(post => post.id === this.id).map(post => post.rebounds),
    blocks: this.props.posts.slice(0).reverse().filter(post => post.id === this.id).map(post => post.blocks),
    steals: this.props.posts.slice(0).reverse().filter(post => post.id === this.id).map(post => post.steals),
  }

  render() {
    return (
      <div className="w-5/6 md:w-3/4 h-auto mx-auto mt-8 mb-4">
          {console.log(this.props)}
        <Line
          width={100}
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
          data={{
            labels: this.state.dates,
            datasets: [
              {
                label: 'points per game',
                data: this.state.points,
                lineTension: 0,
                fill: false,
                borderColor: 'rgb(59, 170, 197)'
              },
              {
                label: 'assists per game',
                data: this.state.assists,
                lineTension: 0,
                fill: false,
                borderColor: 'rgb(229, 75, 75)'
              },
              {
                label: 'rebounds per game',
                data: this.state.rebounds,
                lineTension: 0,
                fill: false,
                borderColor: 'rgb(50, 182, 122)'
              },
              {
                label: 'steals per game',
                data: this.state.steals,
                lineTension: 0,
                fill: false,
                borderColor: 'rgb(240, 207, 97)'
              },
              {
                label: 'blocks per game',
                data: this.state.blocks,
                lineTension: 0,
                fill: false,
                borderColor: 'rgb(152, 121, 208)'
              }
            ]
          }}
        />
      </div>
    );
  }
}

export default withAuth0(Graphs)