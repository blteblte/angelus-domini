
export function getVidePublishedText(date1: Date): string {
  const date2 = new Date()
  const timeDiff = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

  let unit = useSingular(diffDays) ? 'dienas' : 'dienām'
  let value = diffDays
  let justNow = false

  if (diffDays < 1) {
    value = Math.floor(diffDays * 24)
    if (value >= 1) {
      unit = useSingular(value) ? 'stundas' : 'stundām'
    }
    else {
      value = Math.floor(diffDays * 24 * 60)
      if (value >= 1) {
        unit = useSingular(value) ? 'minūtes' : 'minūtēm'
      }
      else {
        justNow = true
      }
    }
  }
  else if (diffDays > 30 && diffDays < 255) {
    value = Math.floor(diffDays / 30)
    unit = useSingular(value) ? 'mēneša' : 'mēnešiem'
  }
  else if (diffDays >= 255) {
    value = Math.floor(diffDays / 255)
    unit = useSingular(value) ? 'gada' : 'gadiem'
  }

  return justNow
    ? `Tikko publicēts`
    : `Publicēts pirms ${value} ${unit}`
}

/* when to use singular word for Latvian lang */
function useSingular(value): boolean {
  const v = value.toString().split('')
  return v[v.length - 1] === '1' && value !== 11
}
