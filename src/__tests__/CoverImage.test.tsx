import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CoverImage from '../components/CoverImage'

describe('cover image', () => {
  it('should check for heading', () => {
    render(<CoverImage />)
    const headingElement = screen.getByText('Upload cover image')
    expect(headingElement).toBeInTheDocument()
  })
})
