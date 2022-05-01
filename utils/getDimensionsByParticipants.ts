export const getDimensionsByParticipants = (participants: number) => {
  let style = null
  if (participants < 0) return style

  if (participants === 1) {
    style = {
      gridTemplateColumns: '1fr',
      gridAutoRows: '1fr'
    }
  } else if (participants === 2) {
    style = {
      gridTemplateColumns: {
        base: '1fr',
        md: '1fr',
        lg: 'repeat(2,1fr)',
        xl: 'repeat(2,1fr)',
        '2xl': 'repeat(2,1fr)'
      },
      gridAutoRows: {
        base: 'auto',
        md: 'auto',
        lg: '100%',
        xl: '100%',
        '2xl': '100%'
      }
    }
  } else if (participants === 3 || participants === 4) {
    //repeat(2,1fr) - auto
    style = {
      gridTemplateColumns: {
        base: '1fr',
        md: '1fr',
        lg: 'repeat(2,1fr)',
        xl: 'repeat(2,1fr)',
        '2xl': 'repeat(2,1fr)'
      },
      gridAutoRows: 'auto'
    }
  } else {
    style = {
      gridTemplateColumns: {
        base: 'repeat(auto-fit,minmax(120px,1fr))',
        md: 'repeat(auto-fit,minmax(300px,1fr))',
        lg: 'repeat(auto-fit,minmax(300px,1fr))',
        xl: 'repeat(auto-fit,minmax(400px,1fr))',
        '2xl': 'repeat(auto-fit,minmax(450px,1fr))'
      },
      gridAutoRows: {
        base: '40%',
        md: '45%',
        lg: '50%',
        xl: '50%',
        '2xl': '50%'
      }
    }
  }

  return style
}
