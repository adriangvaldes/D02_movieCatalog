import '../styles/sidebar.scss';
import { Button } from './Button';

interface sideBarProps {
  onClickButton: (id:number) => void;
  listOfGenres: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }[];
  genreId: number;
}



export function SideBar({onClickButton, listOfGenres, genreId} : sideBarProps) {
  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {listOfGenres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => onClickButton(genre.id)}
              selected={genreId === genre.id}
            />
          ))}
        </div>
    </nav>
  )
}