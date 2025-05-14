const UserFavoriteFood = ({ food }) => {
  return (
    <>
      <h3>Favorite Food:</h3>
      <ul>
        {food.map((f, i) => (
          <li key={f + i}>{f}</li>
        ))}
      </ul>
    </>
  );
};

export default UserFavoriteFood;
