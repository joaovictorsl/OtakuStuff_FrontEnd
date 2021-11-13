import React from 'react'
import { Search } from './styles'
import { IAnime } from '../../../../dtos/Animes'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/modules/rootReducer'

interface ISearchProps {
  look: string,
  setFollowing: React.Dispatch<React.SetStateAction<IAnime[]>>,
  following: IAnime[]
}

export const NoFilterFriendsSearch: React.FC<ISearchProps> = ({ look, setFollowing, following }) => {

  const { following: allFollowing } = useSelector((state: RootState) => state.auth)

  const handleSearch = (searched: string) => {
    if (searched == '') {
      setFollowing(allFollowing)
      return
    }


    let searched_following = searchInFavoriteAnimes(searched.toLowerCase())
    setFollowing(searched_following)
  }

  const searchInFavoriteAnimes = (searched: string): IAnime[] => {
    let searched_following: IAnime[] = []
    for (let i = 0; i < allFollowing.length; i++) {
      let lowerTitle = allFollowing[i].title.toLowerCase()

      if (lowerTitle.includes(searched)) {
        searched_following.push(allFollowing[i])
      }
    }
    return searched_following
  }

  return (
    <div className="w-100 d-flex justify-content-center my-3">
      <Search placeholder={`${look}`}
        onChange={e => handleSearch(e.target.value)}
      />
    </div>
  )
}
