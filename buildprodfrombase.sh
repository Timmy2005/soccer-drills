# shellcheck disable=SC2164
cd ~/soccerdrills
source virtualenvwrapper.sh
workon soccerdrills

dropdb soccerdrills
createdb --owner=timothy soccerdrills

python web/manage_prod.py migrate
python web/manage_prod.py initdb
