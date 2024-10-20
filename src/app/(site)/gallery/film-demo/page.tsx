import { FILM_SIMULATION_FORM_INPUT_OPTIONS } from '@/features/gallery/vendors/fujifilm';
import PhotoFilmSimulation from
  '@/features/gallery/simulation/PhotoFilmSimulation';

export default function FilmPage() {
  return (
    <div className="space-y-1 my-12">
      {FILM_SIMULATION_FORM_INPUT_OPTIONS.map(({ value }) =>
        <div key={value}>
          <PhotoFilmSimulation
            simulation={value}
            type="icon-first"
          />
        </div>)}
    </div>
  );
}
