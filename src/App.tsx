import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Navbar } from './components/Navbar'
import { MusicPlayer } from './components/Navbar'
import { Home } from './pages/Home'
import { CharacterProfile } from './pages/CharacterProfile'
import { RecipePage } from './pages/RecipePage'
import { UserProfile } from './pages/UserProfile'
import { CreatePost } from './pages/CreatePost'
import { Habitants } from './pages/Habitants'
import { HabitantProfile } from './pages/HabitantProfile'
import { ForestMap } from './pages/ForestMap'

export default function App() {
  return (
    <Router>
      <MusicPlayer />
      <Layout>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personaje/:id" element={<CharacterProfile />} />
            <Route path="/receta/:id" element={<RecipePage />} />
            <Route path="/perfil" element={<UserProfile />} />
            <Route path="/crear-publicacion" element={<CreatePost />} />
            <Route path="/habitantes" element={<Habitants />} />
            <Route path="/habitante/:id" element={<HabitantProfile />} />
            <Route path="/mapa" element={<ForestMap />} />
          </Routes>
        </main>
      </Layout>
    </Router>
  )
}
