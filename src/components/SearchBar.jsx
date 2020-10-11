import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    multilineColor: {
        color: 'white'
    },
    textField: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
        },
        "& .MuiOutlinedInput-input": {
        color: "white"
        },
        "&:hover .MuiOutlinedInput-input": {
        color: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "white"
        },
        "& .MuiInputLabel-outlined": {
        color: "white"
        },
        "&:hover .MuiInputLabel-outlined": {
        color: "white"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
        color: "white"
        }
    }
});

export default function SearchBar(props) {

    const [search, setSearch] = useState('')
    const classes = useStyles();

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handlePress = (e) => {
        if(e.which === 13) {
            props.handleSearch(search)
        }
    }

    return (
        <TextField 
            id="outlined-full-width" 
            label='Search through space' 
            className={classes.textField}
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true
              }}
            InputProps={{
                startAdornment: <SearchIcon position="center" />,
                className: classes.multilineColor
            }}
            variant="outlined"
            value={search} onChange={handleChange} 
            type="text" 
            onKeyDown={handlePress}
            
        />
    )

}