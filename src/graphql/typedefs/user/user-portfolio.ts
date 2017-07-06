export default `
type UserPortfolioLanguageExperience {
  language: Language
  level: LanguageLevel
}

type UserPortfolio {
  id: ID!
  height(unit: LengthUnit = CENTIMETER): Float
  chest(unit: LengthUnit = CENTIMETER): Float
  waist(unit: LengthUnit = CENTIMETER): Float
  hip(unit: LengthUnit = CENTIMETER): Float
  foot(unit: LengthUnit = CENTIMETER): Float
  eye: Color
  hair: Color
  hasTattoo: Boolean
  hasPiercing: Boolean
  hasDrivingLicense: Boolean
  isStudent: Boolean
  languages: [UserPortfolioLanguageExperience]
  jobInterests: [JobCategory]
}
`;
