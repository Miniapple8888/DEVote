import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Button, DialogContent } from "@mui/material";
import { startElection } from "../../contracts/devote";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";

const CreateElection = () => {
  const [text, setText] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmitCandidates = () => {
    if (candidates.length < 2) {
      setError("ERROR: Too few candidates");
    } else if (new Set(candidates).size !== candidates.length) {
      setError("ERROR: Candidates must be unique");
    } else {
      setIsModalOpen(true);
      setError("");
    }
  };
  const addCandidate = (event) => {
    event.preventDefault();
    setCandidates((candidates) => [...candidates, text]);
    setText("");
  };
  const removeCandidate = (idx) => {
    setCandidates(candidates.filter((c, i) => i !== idx));
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      setIsModalOpen(false);
      await startElection(candidates);
      console.log("Candidates submitted");
      // TODO: show flash message
      navigate("/dashboard");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <LoadingScreen loading={loading} />
      <div className="w-full h-full flex flex-col items-center gap-4">
        <form className="flex justify-center items-center gap-3" onSubmit={addCandidate}>
          <TextField
            label="Enter Candidate..."
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onSubmit={addCandidate}
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            onClick={addCandidate}
          >
            Add
          </Button>
        </form>
        <div className="w-full flex items-center justify-center gap-2">
          {candidates.length > 0 ? candidates.map((candidate, i) => (
            <Button
              key={i}
              sx={{
                marginRight: "4px",
                ":hover": {
                  textDecoration: "line-through",
                  textDecorationThickness: "2px",
                },
              }}
              variant="outlined"
              onClick={() => removeCandidate(i)}
            >
              {candidate}
            </Button>
          )) : (
            <h1 className="">
              You haven't added any candidates
            </h1>
          )
          
          }
        </div>
        {candidates.length > 0 && <p>Click candidate name to remove</p>}
        {error && <p className="text-red-600">{error}</p>}
        <Button variant="contained" onClick={onSubmitCandidates}>
          Submit
        </Button>
      </div>
      <Dialog open={isModalOpen}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm send of the inputted candidates?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateElection;
