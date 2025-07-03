import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    const fetchPeople = async () => {
      try {
        const responce = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );

        const data = await responce.json();

        setPeople(data);
      } catch {
        setError('Something went wrong');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              isLoading={isLoading}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {error}
                    </p>
                  )}
                  {!error && people.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {!error && people.length > 0 && (
                    <PeopleTable people={people} searchParams={searchParams} />
                  )}
                  <p>
                    There are no people matching the current search criteria
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
