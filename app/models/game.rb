class GameValidator < ActiveModel::Validator
  def validate(record)
  	if record.ryteam!="" && (record.rplayer=="" || record.yplayer=="")
  		record.errors[:base] << 'Need two players to form a team, otherwise leave the team field blank.'
    end
  	if record.gbteam!="" && (record.gplayer=="" || record.bplayer=="")
  		record.errors[:base] << 'Need two players to form a team, otherwise leave the team field blank.'
  	end  
    if (record.yplayer=="" && record.rplayer=="" && record.gplayer=="" && record.bplayer=="")
      record.errors[:base] << 'Need to have at least one player to create a game.'    
    end
  end
end

class Game < ApplicationRecord
  include ActiveModel::Validations
  validates :name, :presence => true
  validates_uniqueness_of :name
  validates_with GameValidator
end

