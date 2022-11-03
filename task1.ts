interface IMovie<T> {
  info: {
    count: number;
    page: number;
    next: string;
    prev: string;
  };
  results: IResults<T>[];
}

interface IResults<T> {
  air_date: string;
  characters: T[];
  created: string;
  episode: string;
  name: string;
  url: string;
}

interface ICharacters {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

type FetchDataType = () => Promise<IMovie<ICharacters>>;

type EpisodeFunctionType = (
  element: IResults<string>
) => Promise<ICharacters[]>;

type CharacterFuncionType = (characther: string) => Promise<ICharacters>;

type GetFilmsType = () => Promise<IMovie<string>>;

const getCharacter: CharacterFuncionType = (character) => {
  return fetch(character, {
    method: "GET",
    redirect: "follow",
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Some at request");
    }

    return res.json();
  });
};

const getFilms: GetFilmsType = () => {
  return fetch("https://rickandmortyapi.com/api/episode", {
    method: "GET",
    redirect: "follow",
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Some at request");
    }

    return res.json();
  });
};

const getEpisode: EpisodeFunctionType = (episode) => {
  const promiseList: Promise<ICharacters>[] = episode.characters.map(
    (character) =>
      new Promise((resolve, reject) => {
        getCharacter(character)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
  );
  return Promise.all(promiseList).then((res) => res);
};

const getFilmData: FetchDataType = async () => {
  try {
    const fetchResponse: IMovie<string> = await getFilms();

    const promiseList: Promise<IResults<ICharacters>>[] =
      fetchResponse.results.map(
        (episode) =>
          new Promise((resolve, reject) => {
            getEpisode(episode)
              .then((res) => resolve({ ...episode, characters: res }))
              .catch((err) => reject(err));
          })
      );

    return Promise.all(promiseList).then((res) => ({
      info: { ...fetchResponse.info },
      results: res,
    }));
  } catch (e) {
    throw new Error(e);
  }
};
getFilmData()
  .then((res) => console.log(res))
  .catch(console.error);
