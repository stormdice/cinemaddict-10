// const sortedByRating = [...films].sort((a, b) => {
//   return b.rating - a.rating;
// });

// const sortedByComments = [...films].sort((a, b) => {
//   return b.commentsCount - a.commentsCount;
// });

// const filmsSortedByRating = sortedByRating.slice(0, 2);
// const filmsSortedByComments = sortedByComments.slice(0, 2);

export const filmListings = [
  {
    title: `All movies. Upcoming`,
    extra: false
  },
  {
    title: `Top rated`,
    // sort: filmsSortedByRating,
    extra: true
  },
  {
    title: `Most commented`,
    // sort: filmsSortedByComments,
    extra: true
  }
];
