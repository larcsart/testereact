import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';


import { listRepos } from './reducer';


class RepoList extends Component {
  state = {
    data: [],
    page: 1,
    loading: false,
  };
  componentDidMount() {
    this.props.listRepos('10');
  }

  loadRepositories = async () => {
    if (this.state.loading) return;

    const { page } = this.state;

    this.setState({ loading: true });

    this.props.listRepos(page);

    this.setState({
      page: page + 1,
      loading: false,
    });
  }
  
  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.id}</Text>
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>{item.format}</Text>
      <Text style={styles.text}>{item.resourceURI}</Text>
    </View>
  );
  render() {
    const { repos } = this.props;
    return (
      <FlatList
        styles={styles.container}
        data={repos}
        renderItem={this.renderItem}
        onEndReached={this.loadRepositories}
        onEndReachedThreshold={0.1}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#990033",
    flexGrow: 1,
    margin: 4,
    padding: 20
  },
  text: {
    color: "#ffffff"
  },
  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  }
});

const mapStateToProps = state => {
  let temp = state.repos.data;
  temp = temp ? temp['results'] : [];

  console.log(temp)

  let storedRepositories = temp.map(repo => ({ key: `${repo.id}`, ...repo }));

  return {
    repos: storedRepositories
  };
};

const mapDispatchToProps = {
  listRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoList);