interface Color {
    description: string,
    hsb: [number, number, number]
}

const palette: Color[] = [
    { description: 'Light Fur', hsb: [45, 20, 90] },
    { description: 'Medium Fur', hsb: [30, 35, 70] },
    { description: 'Dark Fur *', hsb: [15, 50, 50] },
    { description: 'Limbs', hsb: [0, 0, 20] },
    { description: 'Orange', hsb: [30, 100, 100] },
    { description: 'Skin **', hsb: [20, 55, 75] },
    { description: 'Lower Lip', hsb: [30, 35, 90] },
    { description: 'Tongue', hsb: [15, 50, 90] },
]

export { palette }