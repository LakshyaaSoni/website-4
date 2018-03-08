class Team < Crecto::Model
  schema "teams" do
    field :name, String
    field :color, String

    belongs_to :captain, Account, foreign_key: :captain_id
  end
end